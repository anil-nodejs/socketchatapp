let expect = require('expect');
var { generateMessage, generateLocationMessage } = require('./message');
describe('Generate Message', () => {
    it("should generate correct message object", () => {
        let from = "SAY",
            text = "How are you!",
            message = generateMessage(from, text);
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({ from, text });
    });
});

describe('Generate Location Message', () => {
    it("should generate correct location message object", () => {
        let from = 'Anil',
            lat = 15,
            lng = 56,
            url = `https://www.google.com/maps?q=${lat},${lng}`,
            message = generateLocationMessage(from, lat, lng);
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({ from, url });

    })
})
