const assert = require('assert');

const { _normalizeToTopLeftBottomRight, areBoxesOverlapping } = require('../index');


describe('box-overlap', () => {
  describe('_normalizeToTopLeftBottomRight', () => {
    it('can parse `{ top, left, bottom, right }`', () => {
      assert.deepStrictEqual(_normalizeToTopLeftBottomRight({ top: 1, left: 11, bottom: 2, right: 12 }), {
        top: 1,
        right: 12,
        bottom: 2,
        left: 11,
      });
    });

    it('can parse `{ x, y, width, height }`', () => {
      assert.deepStrictEqual(_normalizeToTopLeftBottomRight({ x: 1, y: 2, width: 10, height: 20 }), {
        top: 2,
        right: 11,
        bottom: 22,
        left: 1,
      });
    });

    it('should throw an error if `top` can not be calculated', () => {
      assert.throws(() => {
        _normalizeToTopLeftBottomRight({ left: 2, bottom: 3, right: 4 });
      }, /top/);
    });

    it('should throw an error if `left` can not be calculated', () => {
      assert.throws(() => {
        _normalizeToTopLeftBottomRight({ top: 1, bottom: 3, right: 4 });
      }, /left/);
    });

    it('should throw an error if `bottom` can not be calculated', () => {
      assert.throws(() => {
        _normalizeToTopLeftBottomRight({ top: 1, left: 2, right: 4 });
      }, /bottom/);
    });

    it('should throw an error if `right` can not be calculated', () => {
      assert.throws(() => {
        _normalizeToTopLeftBottomRight({ top: 1, left: 2, bottom: 3 });
      }, /right/);
    });

    it('should throw an error if `bottom` is less than `top`', () => {
      assert.throws(() => {
        _normalizeToTopLeftBottomRight({ top: 3.1, left: 2, bottom: 3, right: 4 });
      }, /less than/);
    });

    it('should throw an error if `right` is less than `left`', () => {
      assert.throws(() => {
        _normalizeToTopLeftBottomRight({ top: 1, left: 4.1, bottom: 3, right: 4 });
      }, /less than/);
    });
  });

  describe('areBoxesOverlapping', () => {
    it('can judge overlap on the upper side', () => {
      const a = { x: 0, y: 1, width: 2, height: 3 };

      //  0 1 2
      // +-+-+-+
      // |F| | | 0
      // +-+-+-+
      // |T|a| | 1
      // +-+-+-+
      // |a|a| | 2
      // +-+-+-+
      // |a|a| | 3
      // +-+-+-+
      assert.strictEqual(
        areBoxesOverlapping(a, { x: 0, y: 1, width: 1, height: 1 }),
        true
      );
      assert.strictEqual(
        areBoxesOverlapping(a, { x: 0, y: 0, width: 1, height: 1 }),
        false
      );
    });

    it('can judge overlap on the lower side', () => {
      const a = { x: 0, y: 1, width: 2, height: 3 };

      //  0 1 2
      // +-+-+-+
      // | | | | 0
      // +-+-+-+
      // |a|a| | 1
      // +-+-+-+
      // |a|a| | 2
      // +-+-+-+
      // |T|a| | 3
      // +-+-+-+
      // |F| | | 4
      // +-+-+-+
      assert.strictEqual(
        areBoxesOverlapping(a, { x: 0, y: 3, width: 1, height: 1 }),
        true
      );
      assert.strictEqual(
        areBoxesOverlapping(a, { x: 0, y: 4, width: 1, height: 1 }),
        false
      );
    });

    it('can judge overlap on the left side', () => {
      const a = { x: 0, y: 1, width: 2, height: 3 };

      //  1 0 1 2
      // +-+-+-+-+
      // | | | | | 0
      // +-+-+-+-+
      // |F|T|a| | 1
      // +-+-+-+-+
      // | |a|a| | 2
      // +-+-+-+-+
      // | |a|a| | 3
      // +-+-+-+-+
      assert.strictEqual(
        areBoxesOverlapping(a, { x: 0, y: 1, width: 1, height: 1 }),
        true
      );
      assert.strictEqual(
        areBoxesOverlapping(a, { x: -1, y: 1, width: 1, height: 1 }),
        false
      );
    });

    it('can judge overlap on the right side', () => {
      const a = { x: 0, y: 1, width: 2, height: 3 };

      //  0 1 2
      // +-+-+-+
      // | | | | 0
      // +-+-+-+
      // |a|T|F| 1
      // +-+-+-+
      // |a|a| | 2
      // +-+-+-+
      // |a|a| | 3
      // +-+-+-+
      assert.strictEqual(
        areBoxesOverlapping(a, { x: 1, y: 1, width: 1, height: 1 }),
        true
      );
      assert.strictEqual(
        areBoxesOverlapping(a, { x: 2, y: 1, width: 1, height: 1 }),
        false
      );
    });
  });
});
