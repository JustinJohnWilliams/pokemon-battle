//fswatch test/gamestate_test.js | xargs -n1 -I{} npm test

import { gameState } from '../server/game.js';

import assert from 'assert';

describe('game state', () => {
  it('doesn\'t die', () => {
    const game = {};

    const result = gameState(game);

    assert.equal(result.isGameReady, false);
    assert.equal(result.currentTurn, 1);
    assert.equal(!!result.chosenForBattle[1], false);
    assert.equal(!!result.chosenForBattle[2], false);
    assert.equal(result.isReadyForBattle, false);
    assert.equal(!!result.isReadyForBattle[1], false);
    assert.equal(!!result.isReadyForBattle[2], false);
  });
});
