---
title: index.ts
nav_order: 1
parent: Modules
---

## index overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [dir](#dir)
  - [dirData](#dirdata)
  - [file](#file)
  - [fileData](#filedata)
- [Destructors](#destructors)
  - [asDir](#asdir)
  - [asFile](#asfile)
  - [match](#match)
- [Model](#model)
  - [Dir (type alias)](#dir-type-alias)
  - [DirContents (type alias)](#dircontents-type-alias)
  - [DirData (type alias)](#dirdata-type-alias)
  - [File (type alias)](#file-type-alias)
  - [FileData (type alias)](#filedata-type-alias)
  - [FsObj (type alias)](#fsobj-type-alias)
  - [FsObjData (type alias)](#fsobjdata-type-alias)
  - [Name (type alias)](#name-type-alias)
- [Utils](#utils)
  - [lookup](#lookup)

---

# Constructors

## dir

**Signature**

```ts
export declare const dir: (name: string) => Dir
```

Added in v1.0.0

## dirData

**Signature**

```ts
export declare const dirData: (contents: DirContents) => DirData
```

Added in v1.0.0

## file

**Signature**

```ts
export declare const file: (name: string, lines: string[]) => File
```

Added in v1.0.0

## fileData

**Signature**

```ts
export declare const fileData: (lines: string[]) => FileData
```

Added in v1.0.0

# Destructors

## asDir

**Signature**

```ts
export declare const asDir: (fso: FsObj) => Option<Dir>
```

Added in v1.0.0

## asFile

**Signature**

```ts
export declare const asFile: (fso: FsObj) => Option<File>
```

Added in v1.0.0

## match

**Signature**

```ts
export declare const match: <Z>(
  onDir: (dir: Dir) => Z,
  onFile: (File: Tag<'File', Name & Pick<Tag<'FileData', { lines: string[] }>, 'lines'>>) => Z
) => (fso: FsObj) => Z
```

Added in v1.0.0

# Model

## Dir (type alias)

**Signature**

```ts
export type Dir = Tag<'Dir', Name & OmitTag<DirData>>
```

Added in v1.0.0

## DirContents (type alias)

**Signature**

```ts
export type DirContents = Record<string, FsObjData>
```

Added in v1.0.0

## DirData (type alias)

**Signature**

```ts
export type DirData = Tag<'DirData', { contents: ReadonlyRecord<string, FsObjData> }>
```

Added in v1.0.0

## File (type alias)

**Signature**

```ts
export type File = Tag<'File', Name & OmitTag<FileData>>
```

Added in v1.0.0

## FileData (type alias)

**Signature**

```ts
export type FileData = Tag<'FileData', { lines: string[] }>
```

Added in v1.0.0

## FsObj (type alias)

**Signature**

```ts
export type FsObj = File | Dir
```

Added in v1.0.0

## FsObjData (type alias)

**Signature**

```ts
export type FsObjData = FileData | DirData
```

Added in v1.0.0

## Name (type alias)

**Signature**

```ts
export type Name = { name: string }
```

Added in v1.0.0

# Utils

## lookup

**Signature**

```ts
export declare const lookup: (name: string) => (dir: DirData) => Option<FsObjData>
```

Added in v1.0.0
