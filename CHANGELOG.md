# Changelog
All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Scripts to build, serve and publish library.

### Fixed
- withForm() does not work on demo site when built with production mode.

## [0.1.0] - 2019-04-25

### Added
- CHANGELOG.md file to record notable changes.

### Changed
- Form support externalized to a package called `ng-quick-form`. `DialogFormField` has been changed to `QuickFormField`.

### Deprecated
- Support for Material Web Components. While I would like to continue supporting this UI toolkit, I do not have the time to do it. Contributions welcomed.

### Removed
- `withForm()` support for Material Web Components.  

## [0.0.4] - 2019-04-15
### Fixed
- Fix "Cannot find module '@angular-mdc/web'" ([#1](kctang/dialog-service#1)) 

[Unreleased]: https://github.com/olivierlacan/keep-a-changelog/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/olivierlacan/keep-a-changelog/compare/v0.0.4...v0.1.0
[0.0.4]: https://github.com/olivierlacan/keep-a-changelog/releases/tag/v0.0.4
