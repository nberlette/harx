<div align="center">
  
<h1><code><a href="https://npm.im/harx">‹harx›</code></a></h1>

<p>
  
  Extract files from <a href="https://w3c.github.io/web-performance/specs/HAR/Overview.html" target="_blank" rel="noopener noreferrer" title="HTTP Archive (HAR) format">HTTP Archives <code>(.har)</code></a> with a simple command line interface.
  
</p>
  
</div>

---  

## Install

To utilize the `harx` command in your Terminal, you first must install it globally.

### [`pnpm`](https://pnpm.io)

```bash
pnpm i -g harx
```

### [`yarn`](https://yarnpkg.com)

```bash
yarn global add harx
```

---  

## Usage

As long as `$(yarn global dir)` or pnpm's global dir is in your system's `$PATH` var, you can run **`harx`** directly:

```bash
USAGE

  $ harx <file> [options]


OPTIONS

  -o, --output  [path]     Output path to extract files (default is ./output) 
  -i, --include [pattern]  RegExp pattern: extract matching files, unless excluded
  -e, --exclude [pattern]  RegExp pattern: skips matching files, unless included

  -n, --no-query           Strip the URL query string from file paths
  -d, --dry-run            Do not persist any lasting changes. For testing.
  -v, --verbose            Be more talkative
  -h, --help               Displays this help page
  --version                Displays the current harx version


EXAMPLES

  # extracts everything to /path/to/out/net
  harx ./net.har --output /path/to/output

  # includes only .html files
  harx archive.har --exclude "*" --include "*.html"

  # excludes only .js files
  harx archive.har --include "*" --exclude "*.js" 
```

## Options

```bash
-o, --output  [path]     Output path for extracted files (default is ./output) 
-i, --include [pattern]  RegExp pattern: extract matching files, unless excluded
-e, --exclude [pattern]  RegExp pattern: skips matching files, unless included

-n, --no-query           Strip the URL query string from file paths
-d, --dry-run            Don't persist any lasting changes. For testing.
-v, --verbose            Be more talkative
```

> **Note:** if you get an error stating `harx cannot be found` or similar, try to run `pnpx harx` or `npx harx` instead.

## Examples

### Basic extraction

```bash
# extracts HTTP snapshot into "./output/nberlette.github.io" subfolder
# includes all images, fonts, styles, and HTML files that DevTools
# recorded in the Network log before you exported the HAR file.

harx ./nberlette.github.io.har -o ./output --no-query
```

### Includes and Excludes

#### Excludes all files except `.html` and `.css`

```bash
harx ./archive.org.har --exclude "*" --include "*.html" --include "*.css"
```

#### Includes only `.png` images, nothing else

```bash
harx ./archive.har -o images -e "*" -i "*.png"
```

### Dry Runs

If you'd like to simply examine what files **_would_** be extracted, without actually writing to the file system...

```bash
harx ./archive.har --output output --dry-run --verbose
```

---  

### References

* [HAR 1.2 Spec | Software is hard](http://www.softwareishard.com/blog/har-12-spec/ "HAR 1.2 Spec | Software is hard")
* [HTTP Archive (HAR) format](https://w3c.github.io/web-performance/specs/HAR/Overview.html "HTTP Archive (HAR) format")
* [micmro/har-format-ts-declaration: TypeScript typing for HAR (HTTP Archive) 1.2](https://github.com/micmro/har-format-ts-declaration "micmro/har-format-ts-declaration: TypeScript typing for HAR (HTTP Archive) 1.2")

### License

<div align="center">
  
MIT © 2022 [Nicholas Berlette](https://github.com/nberlette) • Inspired by [azu](https://github.com/azu)
  
</div>
