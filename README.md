# BFG Repo-Cleaner for Node.js

[![Version](https://img.shields.io/npm/v/node-bfg.svg)](https://www.npmjs.com/package/node-bfg)
[![Downloads/week](https://img.shields.io/npm/dw/node-bfg.svg)](https://npmjs.org/package/node-bfg)
[![Downloads/total](https://img.shields.io/npm/dt/node-bfg.svg)](https://npmjs.org/package/node-bfg)
[![License](https://img.shields.io/npm/l/node-bfg.svg)](https://github.com/0fatal/node-bfg/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

## Introducation
> 使用 [bfg](https://rtyley.github.io/bfg-repo-cleaner/) 完成git仓库敏感数据等的清洗，本工具旨在对bfg做封装，免去手动下载bfg的jar包和安装jre环境。参数传递和bfg一致

## Usage
### 1. Clone 镜像仓库
`git clone --mirror git://example.com/my-repo.git`
> git --mirror 是 Git 提供的一种特殊模式，它可以将一个仓库完全复制到另一个仓库中，并且可以保留所有 Git 的元数据，包括分支、标签和提交记录等。这种模式主要用于仓库的备份、迁移、克隆和协作等场景。

> 使用 git --mirror 模式可以创建一个镜像仓库，它可以与源仓库保持完全一致，并且可以随时更新。当您对源仓库进行更改时，可以使用 git push --mirror 命令将这些更改同步到镜像仓库中。另外，如果您想要从镜像仓库创建一个新的本地仓库，可以使用 git clone --mirror 命令进行克隆。

> 需要注意的是，git --mirror 模式会复制所有分支和提交记录，因此请务必小心操作。如果您不小心将镜像仓库中的某个分支或提交记录删除了，这些更改也将在源仓库中删除。因此，在使用 git --mirror 模式时，请务必谨慎并备份好您的数据。

### 2. 执行清洗命令（预操作，未提交）
```zsh
# 根据 replace-text.txt 的规则清洗仓库，规则样例请查看仓库下的 replace-text-emaple.txt
npx node-bfg --replace-text replace-text.txt my-repo

# 删除所有文件名为 'id_rsa' 或者 'id_dsa'的 文件
npx node-bfg --delete-files id_{dsa,rsa}  my-repo

# 删除所有大于50兆字节的Blob文件
npx node-bfg --strip-blobs-bigger-than 50M  my-repo

# 删除所有名为“.git”的文件夹或文件 - 这是Git中的保留文件名。当从其他源代码控制系统（如Mercurial）迁移到Git时，这些文件经常会成为问题
npx node-bfg --delete-folders .git --delete-files .git  --no-blob-protection  my-repo
```

### 3. 完成清洗
```sh
cd my-repo
git reflog expire --expire=now --all && git gc --prune=now --aggressive
```

### 4. 提交
```sh
git push
```

> 详情请查看 https://rtyley.github.io/bfg-repo-cleaner/

## Problem
```
Protected commits
-----------------

These are your protected commits, and so their contents will NOT be altered:

 * commit 97b21a90 (protected by 'HEAD')
 ```
 加上 `--no-blob-protection` 参数即可（不安全）
 > `--no-blob-protection` allow the BFG to modify even your *latest* commit. Not recommended: you should have already ensured your latest commit is clean.