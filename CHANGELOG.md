# Changelog
All notable changes to this project will be documented in this file.

## [Unreleased]

- ...

## [0.1.4] - 2019-06-21

### Changed

- `withAlert()` and `withConfirm()` renders `content` as HTML.

## [0.1.3] - 2019-06-04

### Changed

- Update minimum version of `ng-quick-form` to 0.0.5.
- Specify peer dependencies as "supported range" to prevent unnecessary warnings.

## [0.1.2] - 2019-05-31

### Changed
- Update to Angular 8 & Angular Material 8.

## [0.1.1] - 2019-05-19

### Added
- Scripts to build, serve and publish library.

### Fixed
- withForm() does not work on demo site when built with production mode.
- Prevent whitespace when rendering content.

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

[Unreleased]: https://github.com/kctang/dialog-service/compare/v0.1.4...HEAD
[0.1.4]: https://github.com/kctang/dialog-service/compare/v0.1.3...v0.1.4
[0.1.3]: https://github.com/kctang/dialog-service/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/kctang/dialog-service/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/kctang/dialog-service/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/kctang/dialog-service/compare/v0.0.4...v0.1.0
[0.0.4]: https://github.com/kctang/dialog-service/releases/tag/v0.0.4
