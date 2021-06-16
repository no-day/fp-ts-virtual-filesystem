/** @since 1.0.0 */

import { Option } from 'fp-ts/lib/Option'
import * as R from 'fp-ts/ReadonlyRecord'
import * as O from 'fp-ts/Option'

import ReadonlyRecord = R.ReadonlyRecord

// -----------------------------------------------------------------------------
// Model
// -----------------------------------------------------------------------------

/**
 * @since 1.0.0
 * @category Model
 */
export type File = Tag<'File', Name & OmitTag<FileData>>

/**
 * @since 1.0.0
 * @category Model
 */
export type Name = { name: string }

/**
 * @since 1.0.0
 * @category Model
 */
export type FileData = Tag<'FileData', { lines: string[] }>

/**
 * @since 1.0.0
 * @category Model
 */
export type DirData = Tag<
  'DirData',
  { contents: ReadonlyRecord<string, FsObjData> }
>

/**
 * @since 1.0.0
 * @category Model
 */
export type Dir = Tag<'Dir', Name & OmitTag<DirData>>

/**
 * @since 1.0.0
 * @category Model
 */
export type FsObj = File | Dir

/**
 * @since 1.0.0
 * @category Model
 */
export type FsObjData = FileData | DirData

/**
 * @since 1.0.0
 * @category Model
 */
export type DirContents = Record<string, FsObjData>

// -----------------------------------------------------------------------------
// Internal
// -----------------------------------------------------------------------------

type Tag<T, D> = { _tag: T } & D

type OmitTag<T> = Omit<T, '_tag'>

const tag =
  <t extends string>(tag: t) =>
  <d>(data: d) => ({ _tag: tag, ...data })

// -----------------------------------------------------------------------------
// Constructors
// -----------------------------------------------------------------------------

/**
 * @since 1.0.0
 * @category Constructors
 */
export const file = (name: string, lines: string[]): File =>
  tag('File')({ name, lines })

/**
 * @since 1.0.0
 * @category Constructors
 */
export const dir = (name: string): Dir => tag('Dir')({ name, contents: {} })

/**
 * @since 1.0.0
 * @category Constructors
 */
export const dirData = (contents: DirContents): DirData =>
  tag('DirData')({ contents })

/**
 * @since 1.0.0
 * @category Constructors
 */
export const fileData = (lines: string[]): FileData =>
  tag('FileData')({ lines })

// -----------------------------------------------------------------------------
// Destructors
// -----------------------------------------------------------------------------

/**
 * @since 1.0.0
 * @category Destructors
 */
export const match =
  <Z>(onDir: (dir: Dir) => Z, onFile: (File: File) => Z) =>
  (fso: FsObj): Z => {
    switch (fso._tag) {
      case 'Dir':
        return onDir(fso)
      case 'File':
        return onFile(fso)
    }
  }

/**
 * @since 1.0.0
 * @category Destructors
 */
export const asDir: (fso: FsObj) => Option<Dir> = match(O.some, () => O.none)

/**
 * @since 1.0.0
 * @category Destructors
 */
export const asFile: (fso: FsObj) => Option<File> = match(() => O.none, O.some)

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

/**
 * @since 1.0.0
 * @category Utils
 */
export const lookup =
  (name: string) =>
  (dir: DirData): Option<FsObjData> =>
    R.lookup(name)(dir.contents)
