import * as fs from 'fs';
import ErrnoException = NodeJS.ErrnoException;

export const patternImageRemover = async (list:string[]) => {
  for (let i=0; i < list.length; i++) {
    fs.unlink(`${list[i]}.txt`, (err:ErrnoException | null) => {
      if (err) console.error(err);
    })
  }
}
