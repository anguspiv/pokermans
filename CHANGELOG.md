# [1.8.0](https://github.com/anguspiv/pokermans/compare/v1.7.0...v1.8.0) (2022-03-07)


### Features

* **account-page:** cleans up the style pages ([017e4b5](https://github.com/anguspiv/pokermans/commit/017e4b5e678efd1837bb6de5dbb90d6c7b2c292f))

# [1.7.0](https://github.com/anguspiv/pokermans/compare/v1.6.0...v1.7.0) (2022-03-06)


### Features

* adds desktop sidebar ([8767fe5](https://github.com/anguspiv/pokermans/commit/8767fe54a826db87d241d91be3871d988225c11d))
* adds the app menu component ([f7a23e8](https://github.com/anguspiv/pokermans/commit/f7a23e89657b583a09d90885a05059ad9d520b0a))
* **app-drawer:** hides the app drawer on desktop ([2d18fbb](https://github.com/anguspiv/pokermans/commit/2d18fbb6c3b1e74387bc223b743416a8a1dbe505))
* **nav-link:** adds transparent style variant ([bdfad48](https://github.com/anguspiv/pokermans/commit/bdfad4805bc6d6fcb5a07e7ce8c4fc51712ac132))
* updates to use a teal color theme ([3406191](https://github.com/anguspiv/pokermans/commit/3406191e4745c4a57f7f19103951d1df8ec8234b))

# [1.6.0](https://github.com/anguspiv/pokermans/compare/v1.5.0...v1.6.0) (2022-03-02)


### Bug Fixes

* **edit-profile:** adds padding ([4f0e78d](https://github.com/anguspiv/pokermans/commit/4f0e78d91ed3dec86a2e17925d7c4c93e1986ef1))
* **gql-profile:** updates profile by userid and not id ([9324a47](https://github.com/anguspiv/pokermans/commit/9324a47f0cedb6f7890ecd69958c6d051ce913da))
* **profile-form:** resets form on profile update ([652d7b6](https://github.com/anguspiv/pokermans/commit/652d7b6b7b4d8c83c1e239463b25cde32b34f4ca))
* stupid typing errors ([caa2220](https://github.com/anguspiv/pokermans/commit/caa2220543ff93afb4c27a4ef04c4e33e02f8ff8))
* **user:** defaults args to undefined ([482dcbb](https://github.com/anguspiv/pokermans/commit/482dcbbda17d138c731f8441ee1a208a9372def6))


### Features

* **account-page:** adds edit profile ([09b9896](https://github.com/anguspiv/pokermans/commit/09b9896edd1f7c92f6d3b302f57a3c26fd208be0))
* adds apollo client for data fetching ([886bdd3](https://github.com/anguspiv/pokermans/commit/886bdd3553eb94e05995ff6655ed4f323ec27a42))
* adds common user and profile queries ([5e187e2](https://github.com/anguspiv/pokermans/commit/5e187e2105e4d1c3f1dffd8d92558d8da13aab05))
* adds edit profile component ([83461b7](https://github.com/anguspiv/pokermans/commit/83461b72c0680445aaf47e853c2bf21b01a446df))
* adds the profile form component ([7c5b6b4](https://github.com/anguspiv/pokermans/commit/7c5b6b4202457688a02cf53e3b74f86fd0264005))
* **edit-profile:** adds loading state for the form ([c54ea25](https://github.com/anguspiv/pokermans/commit/c54ea256ee59e8f32738550054a65f490d18b0ce))
* **profile-form:** adds loading state ([7fb2cd6](https://github.com/anguspiv/pokermans/commit/7fb2cd6991011eaacb3fba33a74cfdea914f30c1))

# [1.5.0](https://github.com/anguspiv/pokermans/compare/v1.4.0...v1.5.0) (2022-02-22)


### Features

* **api:** requires user login to access apis ([5983aba](https://github.com/anguspiv/pokermans/commit/5983abac1723bc065279fd0c7914df3bc60215c9)), closes [#84](https://github.com/anguspiv/pokermans/issues/84)
* **graphql:** secures user and profile mutations ([a731ff7](https://github.com/anguspiv/pokermans/commit/a731ff7d2def6abebd4bb1a2636204aac39baa6f)), closes [#84](https://github.com/anguspiv/pokermans/issues/84)

# [1.4.0](https://github.com/anguspiv/pokermans/compare/v1.3.0...v1.4.0) (2022-01-26)


### Features

* adds the /account page ([e44a50f](https://github.com/anguspiv/pokermans/commit/e44a50fce61d85f29b93bc203902edcb75fb5a49)), closes [#72](https://github.com/anguspiv/pokermans/issues/72)

# [1.3.0](https://github.com/anguspiv/pokermans/compare/v1.2.0...v1.3.0) (2022-01-25)


### Bug Fixes

* **api-user:** corrects typing errors ([ce8ffed](https://github.com/anguspiv/pokermans/commit/ce8ffedc5c19307134d37d37477a2dffbc248bc8))
* **auth:** fixes next-auth signin error ([b36ad16](https://github.com/anguspiv/pokermans/commit/b36ad1604dc7d77e3fa1f13e748a426330dcbfd0))
* **menu-button:** uses times icon for close ([0c17eae](https://github.com/anguspiv/pokermans/commit/0c17eae19d51f16a8bd93ccd5361a3f089045153))
* **profile-card:** fixes typing errors in docs ([dc9e77b](https://github.com/anguspiv/pokermans/commit/dc9e77bc999835c103b3157b304f8600ae4a5e77))


### Features

* adds profile card component ([75c9a54](https://github.com/anguspiv/pokermans/commit/75c9a542cf658199e2a75172e60bf580b7671d2c)), closes [#47](https://github.com/anguspiv/pokermans/issues/47)
* adds user and profile crud apis ([44e9ef7](https://github.com/anguspiv/pokermans/commit/44e9ef7ce07ac8927b07b490b2e6c994b885c562)), closes [#53](https://github.com/anguspiv/pokermans/issues/53)
* **db:** adds user profile schema ([2173513](https://github.com/anguspiv/pokermans/commit/2173513a1fa02ea6be4e84b8bc284d7f4e2b4ec3)), closes [#53](https://github.com/anguspiv/pokermans/issues/53)
* **graphql:** adds user and profile queries ([a47b2e3](https://github.com/anguspiv/pokermans/commit/a47b2e38dedaf3dce11d659ff1ee9d529ba1dc87)), closes [#53](https://github.com/anguspiv/pokermans/issues/53)

# [1.2.0](https://github.com/anguspiv/pokermans/compare/v1.1.0...v1.2.0) (2022-01-24)


### Features

* adds breadcrumbs component for site navigation ([ad5d4b5](https://github.com/anguspiv/pokermans/commit/ad5d4b5c5dd7acbf670cf604514cbec5149fe04c)), closes [#75](https://github.com/anguspiv/pokermans/issues/75)
* adds the page header component ([f324696](https://github.com/anguspiv/pokermans/commit/f324696c82b5d4e1f9738315c1ea9479374d0314)), closes [#75](https://github.com/anguspiv/pokermans/issues/75)

# [1.1.0](https://github.com/anguspiv/pokermans/compare/v1.0.0...v1.1.0) (2022-01-22)


### Bug Fixes

* **app-header:** corrects size prop ([736880a](https://github.com/anguspiv/pokermans/commit/736880ae527a706bc810dad33b96ba046f4d105d))
* removes pro fonts from app ([99884fd](https://github.com/anguspiv/pokermans/commit/99884fd9f6ef5551e875384d1a5c8628b37f4773))


### Features

* adds app menu title component ([b4ade8d](https://github.com/anguspiv/pokermans/commit/b4ade8da1c220daf0f45fa523a674cd5e537f7f0))
* adds mobile menu button ([90202f7](https://github.com/anguspiv/pokermans/commit/90202f7f78004e6a8bc866f2c53623221bca747f)), closes [#52](https://github.com/anguspiv/pokermans/issues/52)
* adds nav link component ([465c2b4](https://github.com/anguspiv/pokermans/commit/465c2b40aee05cf5f3b132dc52a2a4007a084bdd))
* adds the app drawer component ([0f3f325](https://github.com/anguspiv/pokermans/commit/0f3f3250c9efc5185411025bc4dd1bba32bd14a5))
* adds the app header component ([bd09aae](https://github.com/anguspiv/pokermans/commit/bd09aaef9d2446349e7a88d88b0994f65025de9d))
* adds the app menu component ([f07905e](https://github.com/anguspiv/pokermans/commit/f07905e91d0044b1d4f8f08139d6a87152b0be50))
* adds the page layout component ([54ad713](https://github.com/anguspiv/pokermans/commit/54ad71328a540d3f1ca6c0c4d02288cb0148d499)), closes [#52](https://github.com/anguspiv/pokermans/issues/52)
* **app:** adds the application header ([3b92d96](https://github.com/anguspiv/pokermans/commit/3b92d964da66e83adb656db747e0cf15108d2fcc)), closes [#52](https://github.com/anguspiv/pokermans/issues/52)
* **nav-link:** hides empty space if no icon ([a26fb1e](https://github.com/anguspiv/pokermans/commit/a26fb1ea6cab1560232e84ebd2231d26fb704395))

# 1.0.0 (2021-12-06)


### Bug Fixes

* adds nextauth secret ([af68ed3](https://github.com/anguspiv/pokermans/commit/af68ed38f03b31bdb6d52264db78347b441f7dc9))


### Features

* adds basic user authentication ([e1b74fb](https://github.com/anguspiv/pokermans/commit/e1b74fbe054cc0d08addc951e717e2e48dfcc79a)), closes [#50](https://github.com/anguspiv/pokermans/issues/50) [#48](https://github.com/anguspiv/pokermans/issues/48) [#19](https://github.com/anguspiv/pokermans/issues/19)
