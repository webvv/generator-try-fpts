import { pipe } from 'fp-ts/function'
import * as R from 'fp-ts/Reader'

interface Config {
  a: number,
  b: string
}

interface Config2 {
  url: string
}

const result1 = pipe(
  R.ask<Config>(),
  R.map(x => x.a),
  R.map(a => a+1),
)({ a: 10, b: ''})

const result2 = pipe(
  R.ask<Config>(),
  R.map(x => x.a),
  R.map(a => a+1),
  R.flatMap(x => R.ask<Config2>()),
  R.map(x => x.url)
)({ a: 10, b: '', url: 'url1'})

console.log(result2)