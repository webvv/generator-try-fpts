import * as R from 'fp-ts/Reader'
import { pipe } from 'fp-ts/function'

interface Config { a: number, b: string }
interface Config2 { url: string }

const result = pipe(
  R.ask<Config>(),
  R.map(x => x.a),
  R.map(a => a+1),
  R.flatMap(x => R.ask<Config2>()),
  R.map(x => x.url)
)({ a: 10, b: '', url: 'https://youtube.com/@webvv'})

console.log(result)