import { ShortenPipe } from './shorten.pipe';

describe('ShortenPipe', () => {
  it('create an instance', () => {
    const pipe = new ShortenPipe();
    expect(pipe).toBeTruthy();
  });

  it('short value', () => {
    const pipe = new ShortenPipe();

    const testValue = `"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
       "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."
      `;

    const result = pipe.transform(testValue);

    expect(result).toBe(testValue.substr(0, 32) + "...");
  });
});
