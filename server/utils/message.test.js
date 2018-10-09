const expect = require('expect');
const {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const from = 'Alex';
        const text = 'My awesome message.';
        const message = generateMessage(from, text);

        expect(typeof message.createdAt === 'number').toBeTruthy();
        expect(message).toHaveProperty('from', 'text', 'createdAt');
    });
});