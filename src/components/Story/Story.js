import { Story as InkyStory } from './ink';
import storyContent from './story.json';

export default class Story {
  constructor() {
    this._story = new InkyStory(storyContent);

    this.currentOptions = [];
    this.hasOptions = false;
    this.currentLines = [];
    this.currentTags = [];

    this.scene = 'home';
    this.sceneHasChanged = false;

    this.next();
  }

  goTo(knot) {
    this._story.ChoosePathString(knot);
    this.next();
  }

  getKnotForChoice(index) {
    try {
      return this._story.currentChoices[index].targetPath.GetComponent(0).name;
    } catch (e) {
      return 'start';
    }
  }

  hasTag(tag) {
    return this.currentTags.indexOf(tag) > -1;
  }

  choose(index) {
    this._story.ChooseChoiceIndex(index);
    this.next();
  }

  get(name) {
    return this._story.variablesState.$(name);
  }

  set(name, value) {
    this._story.variablesState.$(name, value);
  }

  next() {
    this.currentLines = [];
    this.currentTags = [];
    while (this._story.canContinue) {
      this.currentLines = this.currentLines.concat(this._story.Continue());
      this.currentTags = this.currentTags.concat(this._story.currentTags);
    }

    // Check for a scene change
    if (this.get('scene') && this.scene !== this.get('scene')) {
      this.scene = this.get('scene') || 'home';
      this.sceneHasChanged = true;
    } else {
      this.sceneHasChanged = false;
    }

    // Options
    this.currentOptions = this._story.currentChoices;
    this.hasOptions = this.currentOptions.length > 0;

    if (this.currentOptions.length === 1 && this.currentOptions[0].text === 'NEXT') {
      this.hasOptions = false;
    }
  }
}
