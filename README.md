<h1 align="center"><code>harx</code></h1>

Simple command line utility to extract har files to a directory. [HTTP Archive (HAR) info ->](https://w3c.github.io/web-performance/specs/HAR/Overview.html "HTTP Archive (HAR) format")

---  

## Install

```bash
# pnpm: recommended
pnpm add -g harx

# or yarn
yarn global add harx

# or npm
npm i -g harx
```

### Running as Executable

```bash
pnpx harx <input>  
# or 
npx harx <input>
```

## Usage

```bash
    Usage
      $ harx <file> [options]

    Options:
      --output, -o 		Output directory
      --remove-query-string, -r Remove query string from file path
      --dry-run, -d 		Enable dry run mode
      --verbose 		Show processing file path

    Examples
      $ harx ./net.har --output /path/to/output
```

## References

* [HAR 1.2 Spec | Software is hard](http://www.softwareishard.com/blog/har-12-spec/ "HAR 1.2 Spec | Software is hard")
* [HTTP Archive (HAR) format](https://w3c.github.io/web-performance/specs/HAR/Overview.html "HTTP Archive (HAR) format")
* [micmro/har-format-ts-declaration: TypeScript typing for HAR (HTTP Archive) 1.2](https://github.com/micmro/har-format-ts-declaration "micmro/har-format-ts-declaration: TypeScript typing for HAR (HTTP Archive) 1.2")

## License

MIT © 2021 [Nicholas Berlette](https://github.com/nberlette) • Inspired by [azu](https://github.com/azu)
