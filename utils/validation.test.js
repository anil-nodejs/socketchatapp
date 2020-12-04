const expect = require('expect');
const { isRealString } = require('./isRealString');
describe('is Real String', () => {
    it('should reject non string values', () => {
        let res = isRealString(65)
        expect(res).toBe(false);
    })
    it('should reject string with space values', () => {
        let res = isRealString('                     ')
        expect(res).toBe(false);
    })
    it('should allow string with non-space char', () => {
        let res = isRealString('          WDJ                 ')
        expect(res).toBe(true);
    })
});