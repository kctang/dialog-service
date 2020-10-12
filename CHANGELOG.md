# Changelog
All notable changes to this project will be documented in this file.

## [Unreleased]

## [0.2.3] - 2020-10-13

- Update `content` for alert, confirm and form dialog to allow custom styling.

## [0.2.2] - 2020-10-12

- Remove Angular version upper limit.

## [0.2.1] - 2020-02-07

### Changed

- Update Angular to ~9.0.0.

### Removed

- Remove code and dependencies for Angular Material Web Component. 

## [0.2.0] - 2020-02-06

### Changed

- Update Angular to ~9.0.0-rc.14. 

## [0.1.10] - 2019-07-14

### Added

- Ability to configureMatDialogConfig options via `dialogOptions`. 

## [0.1.9] - 2019-07-07

### Added

- Add ability to retrieve form raw value.

## [0.1.8] - 2019-06-28

### Added

- Experimental support for callback function when form is created via `formCreated`. This can be used to perform post-form creation manipulations and other advanced form validations.

## [0.1.7] - 2019-06-27

### Added

- Experimental support to listen to form value changes by passing in a Subject via `valueChanges`. 

## [0.1.6] - 2019-06-23

### Added

- Proper `flex-cell` layout configuration when using forms via `withForm()`. It supports an optional `layout` property with options to configure `flexCell`, `gutter`, `growItems`, `debug`.

## [0.1.5] - 2019-06-23

### Changed

- `withForm()` renders fields within form tag with these attributes `flex-cell gutter default-cell-12` to support `layout` properties of form field definitions (quick hack, not ideal).

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

[Unreleased]: https://github.com/kctang/dialog-service/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/kctang/dialog-service/compare/v0.1.10...v0.2.0
[0.1.10]: https://github.com/kctang/dialog-service/compare/v0.1.9...v0.1.10
[0.1.9]: https://github.com/kctang/dialog-service/compare/v0.1.8...v0.1.9
[0.1.8]: https://github.com/kctang/dialog-service/compare/v0.1.7...v0.1.8
[0.1.7]: https://github.com/kctang/dialog-service/compare/v0.1.6...v0.1.7
[0.1.6]: https://github.com/kctang/dialog-service/compare/v0.1.5...v0.1.6
[0.1.5]: https://github.com/kctang/dialog-service/compare/v0.1.4...v0.1.5
[0.1.4]: https://github.com/kctang/dialog-service/compare/v0.1.3...v0.1.4
[0.1.3]: https://github.com/kctang/dialog-service/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/kctang/dialog-service/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/kctang/dialog-service/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/kctang/dialog-service/compare/v0.0.4...v0.1.0
[0.0.4]: https://github.com/kctang/dialog-service/releases/tag/v0.0.4
