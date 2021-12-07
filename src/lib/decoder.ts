import * as t from 'io-ts'
import * as E from 'fp-ts/Either'
import reporter from 'io-ts-reporters'

export function decode<I, A>(codec: t.Decoder<I, A>): (value: I) => A {
    return (value: I) => {
        const result = codec.decode(value);

        if (E.isLeft(result)) {
            throw new Error(reporter.report(result).reduce((a,b) => a + "\n" + b));
        } else {
            return result.right
        }
    }
  }