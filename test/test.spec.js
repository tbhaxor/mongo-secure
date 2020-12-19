/* eslint-disable @typescript-eslint/no-var-requires */
const { expect } = require('chai')
const { serializer } = require('../index')

describe('MongoSecure Testing (with maxNestingLevel)', () => {
  let post
  const replacer = Math.random().toString(36).slice(2)

  beforeEach(done => {
    post = { app: 1, app2: { app2: 1, app3: { app4: 1 } } }
    done()
  })

  it('should set maxNestedObject to 1 when it is undefined', done => {
    // @ts-ignore
    const r = serializer(post, 1, { maxNestingLevel: undefined, replaceWith: replacer })
    expect(r.app).to.be.equal(post.app)
    expect(r.app2).to.be.equal(replacer)
    done()
  })

  it('should set maxNestedObject to 1 when it is 0', done => {
    const r = serializer(post, 1, { maxNestingLevel: 0, replaceWith: replacer })
    expect(r.app).to.be.equal(post.app)
    expect(r.app2).to.be.equal(replacer)
    done()
  })

  // eslint-disable-next-line quotes
  it("should send '" + replacer + "' as the replaced content", done => {
    const r = serializer(post, 1, { maxNestingLevel: 0, replaceWith: replacer })
    expect(r.app2).to.be.equal(replacer)
    done()
  })

  // eslint-disable-next-line quotes
  it("should set 'app2' to '" + replacer + "' and 'app' to 1 when limit 1", done => {
    const r = serializer(post, 1, { maxNestingLevel: 1, replaceWith: replacer })
    expect(r.app2).to.be.equal(replacer)
    expect(r.app).to.be.equal(post.app)
    done()
  })

  // eslint-disable-next-line quotes
  it("should set 'app2.app3' to '" + replacer + "' when limit 2", done => {
    const r = serializer(post, 1, { maxNestingLevel: 2, replaceWith: replacer })
    expect(r.app).to.be.equal(post.app)
    expect(typeof r.app2).to.be.equal(typeof post.app2)
    expect(r.app2.app2).to.be.equal(post.app2.app2)
    expect(r.app2.app3).to.be.equal(replacer)
    done()
  })
})

describe('MongoSecure Testing (with limit)', () => {
  let post
  const replacer = Math.random().toString(36).slice(2)

  beforeEach(done => {
    post = { app: 1, app2: { app2: 1, app3: { app4: 1 } } }
    done()
  })

  it('should set limit to 1 when it is undefined', done => {
    // @ts-ignore
    const r = serializer(post, 1, { limit: undefined, replaceWith: replacer })
    expect(r.app).to.be.equal(post.app)
    expect(r.app2).to.be.equal(replacer)
    done()
  })

  it('should set limit to 1 when it is 0', done => {
    const r = serializer(post, 1, { limit: 0, replaceWith: replacer })
    expect(r.app).to.be.equal(post.app)
    expect(r.app2).to.be.equal(replacer)
    done()
  })

  // eslint-disable-next-line quotes
  it("should send '" + replacer + "' as the replaced content", done => {
    const r = serializer(post, 1, { limit: 0, replaceWith: replacer })
    expect(r.app2).to.be.equal(replacer)
    done()
  })

  // eslint-disable-next-line quotes
  it("should set 'app2' to '" + replacer + "' and 'app' to 1 when limit 1", done => {
    const r = serializer(post, 1, { limit: 1, replaceWith: replacer })
    expect(r.app2).to.be.equal(replacer)
    expect(r.app).to.be.equal(post.app)
    done()
  })

  // eslint-disable-next-line quotes
  it("should set 'app2.app3' to '" + replacer + "' when limit 2", done => {
    const r = serializer(post, 1, { maxNestingLevel: 2, replaceWith: replacer })
    expect(r.app).to.be.equal(post.app)
    expect(typeof r.app2).to.be.equal(typeof post.app2)
    expect(r.app2.app2).to.be.equal(post.app2.app2)
    expect(r.app2.app3).to.be.equal(replacer)
    done()
  })
})
