import urlValidator from ".";

describe("urlValidator", () => {
  it('should return true for a valid url', () => {
    const result = urlValidator('www.example.com')
    expect(result).toEqual(true)
  })

  it('should return false for an invalid url', () => {
    const result = urlValidator('blah')
    expect(result).toEqual(false)
  })
})