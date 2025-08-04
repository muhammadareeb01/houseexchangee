woningruil-platform/
├── README.md
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── .env.local
├── .env.example
├── .gitignore
├── .eslintrc.json
├── .prettierrc
│
├── public/
│   ├── images/
│   │   ├── logos/
│   │   │   ├── logo.svg
│   │   │   ├── logo-dark.svg
│   │   │   └── favicon.ico
│   │   ├── placeholders/
│   │   │   ├── house-placeholder.jpg
│   │   │   ├── profile-placeholder.svg
│   │   │   └── no-image.png
│   │   ├── icons/
│   │   │   ├── home.svg
│   │   │   ├── search.svg
│   │   │   ├── heart.svg
│   │   │   ├── message.svg
│   │   │   └── user.svg
│   │   └── backgrounds/
│   │       ├── hero-bg.jpg
│   │       ├── pattern-bg.svg
│   │       └── gradient-bg.png
│   ├── documents/
│   │   ├── terms-of-service.pdf
│   │   ├── privacy-policy.pdf
│   │   └── user-guide.pdf
│   └── manifest.json
│
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   ├── not-found.tsx
│   │   │
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   ├── page.tsx
│   │   │   │   └── loading.tsx
│   │   │   ├── register/
│   │   │   │   ├── page.tsx
│   │   │   │   └── loading.tsx
│   │   │   ├── forgot-password/
│   │   │   │   └── page.tsx
│   │   │   └── reset-password/
│   │   │       └── page.tsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── loading.tsx
│   │   │   ├── my-listings/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── edit/
│   │   │   │   │       └── page.tsx
│   │   │   │   └── new/
│   │   │   │       └── page.tsx
│   │   │   ├── favorites/
│   │   │   │   └── page.tsx
│   │   │   ├── messages/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [conversationId]/
│   │   │   │       └── page.tsx
│   │   │   ├── exchanges/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── pending/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── active/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── history/
│   │   │   │       └── page.tsx
│   │   │   ├── profile/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── edit/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── settings/
│   │   │   │       └── page.tsx
│   │   │   └── notifications/
│   │   │       └── page.tsx
│   │   │
│   │   ├── search/
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx
│   │   │   └── results/
│   │   │       └── page.tsx
│   │   │
│   │   ├── listings/
│   │   │   ├── page.tsx
│   │   │   ├── [id]/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── loading.tsx
│   │   │   │   ├── gallery/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── contact/
│   │   │   │       └── page.tsx
│   │   │   └── category/
│   │   │       └── [slug]/
│   │   │           └── page.tsx
│   │   │
│   │   ├── exchanges/
│   │   │   ├── page.tsx
│   │   │   ├── [id]/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── details/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── contract/
│   │   │   │       └── page.tsx
│   │   │   └── request/
│   │   │       └── page.tsx
│   │   │
│   │   ├── about/
│   │   │   ├── page.tsx
│   │   │   ├── how-it-works/
│   │   │   │   └── page.tsx
│   │   │   ├── safety/
│   │   │   │   └── page.tsx
│   │   │   └── faq/
│   │   │       └── page.tsx
│   │   │
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   │
│   │   ├── legal/
│   │   │   ├── terms/
│   │   │   │   └── page.tsx
│   │   │   ├── privacy/
│   │   │   │   └── page.tsx
│   │   │   └── cookies/
│   │   │       └── page.tsx
│   │   │
│   │   └── api/
│   │       ├── auth/
│   │       │   ├── login/
│   │       │   │   └── route.ts
│   │       │   ├── register/
│   │       │   │   └── route.ts
│   │       │   ├── logout/
│   │       │   │   └── route.ts
│   │       │   └── refresh/
│   │       │       └── route.ts
│   │       ├── listings/
│   │       │   ├── route.ts
│   │       │   ├── [id]/
│   │       │   │   └── route.ts
│   │       │   ├── search/
│   │       │   │   └── route.ts
│   │       │   └── favorites/
│   │       │       └── route.ts
│   │       ├── exchanges/
│   │       │   ├── route.ts
│   │       │   ├── [id]/
│   │       │   │   └── route.ts
│   │       │   └── request/
│   │       │       └── route.ts
│   │       ├── messages/
│   │       │   ├── route.ts
│   │       │   └── [conversationId]/
│   │       │       └── route.ts
│   │       ├── users/
│   │       │   ├── profile/
│   │       │   │   └── route.ts
│   │       │   └── [id]/
│   │       │       └── route.ts
│   │       ├── upload/
│   │       │   └── route.ts
│   │       └── notifications/
│   │           └── route.ts
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Textarea.tsx
│   │   │   ├── Checkbox.tsx
│   │   │   ├── Radio.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Dialog.tsx
│   │   │   ├── Dropdown.tsx
│   │   │   ├── Tooltip.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Avatar.tsx
│   │   │   ├── Spinner.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   ├── Progress.tsx
│   │   │   ├── Tabs.tsx
│   │   │   ├── Accordion.tsx
│   │   │   ├── Slider.tsx
│   │   │   ├── Switch.tsx
│   │   │   ├── DatePicker.tsx
│   │   │   ├── TimePicker.tsx
│   │   │   ├── FileUpload.tsx
│   │   │   ├── ImageUpload.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── Table.tsx
│   │   │   ├── Toast.tsx
│   │   │   ├── Alert.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Navigation.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   ├── Breadcrumbs.tsx
│   │   │   ├── PageHeader.tsx
│   │   │   ├── Container.tsx
│   │   │   ├── Section.tsx
│   │   │   └── Grid.tsx
│   │   │
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   ├── ForgotPasswordForm.tsx
│   │   │   ├── ResetPasswordForm.tsx
│   │   │   ├── AuthGuard.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   └── SocialLogin.tsx
│   │   │
│   │   ├── listings/
│   │   │   ├── ListingCard.tsx
│   │   │   ├── ListingGrid.tsx
│   │   │   ├── ListingList.tsx
│   │   │   ├── ListingDetail.tsx
│   │   │   ├── ListingForm.tsx
│   │   │   ├── ListingGallery.tsx
│   │   │   ├── ListingMap.tsx
│   │   │   ├── ListingFilters.tsx
│   │   │   ├── ListingSearch.tsx
│   │   │   ├── ListingSorting.tsx
│   │   │   ├── FavoriteButton.tsx
│   │   │   ├── ShareButton.tsx
│   │   │   ├── ContactOwner.tsx
│   │   │   ├── PropertyFeatures.tsx
│   │   │   ├── PropertyAmenities.tsx
│   │   │   ├── PropertyLocation.tsx
│   │   │   ├── PropertyImages.tsx
│   │   │   ├── PropertyRules.tsx
│   │   │   └── PropertyAvailability.tsx
│   │   │
│   │   ├── exchanges/
│   │   │   ├── ExchangeCard.tsx
│   │   │   ├── ExchangeList.tsx
│   │   │   ├── ExchangeDetail.tsx
│   │   │   ├── ExchangeForm.tsx
│   │   │   ├── ExchangeRequest.tsx
│   │   │   ├── ExchangeStatus.tsx
│   │   │   ├── ExchangeTimeline.tsx
│   │   │   ├── ExchangeContract.tsx
│   │   │   ├── ExchangeReview.tsx
│   │   │   ├── ExchangeRating.tsx
│   │   │   ├── ExchangeCalendar.tsx
│   │   │   └── ExchangeChat.tsx
│   │   │
│   │   ├── messaging/
│   │   │   ├── MessageList.tsx
│   │   │   ├── MessageItem.tsx
│   │   │   ├── MessageInput.tsx
│   │   │   ├── ConversationList.tsx
│   │   │   ├── ConversationItem.tsx
│   │   │   ├── ChatWindow.tsx
│   │   │   ├── MessageBubble.tsx
│   │   │   ├── MessageStatus.tsx
│   │   │   ├── FileAttachment.tsx
│   │   │   ├── ImageAttachment.tsx
│   │   │   └── TypingIndicator.tsx
│   │   │
│   │   ├── profile/
│   │   │   ├── ProfileCard.tsx
│   │   │   ├── ProfileForm.tsx
│   │   │   ├── ProfileImage.tsx
│   │   │   ├── ProfileStats.tsx
│   │   │   ├── ProfileReviews.tsx
│   │   │   ├── ProfileVerification.tsx
│   │   │   ├── ProfileSettings.tsx
│   │   │   ├── ProfilePreferences.tsx
│   │   │   ├── ProfileNotifications.tsx
│   │   │   └── ProfileSecurity.tsx
│   │   │
│   │   ├── search/
│   │   │   ├── SearchBar.tsx
│   │   │   ├── SearchFilters.tsx
│   │   │   ├── SearchResults.tsx
│   │   │   ├── SearchSuggestions.tsx
│   │   │   ├── SearchHistory.tsx
│   │   │   ├── SavedSearches.tsx
│   │   │   ├── LocationSearch.tsx
│   │   │   ├── DateRangeSearch.tsx
│   │   │   ├── PriceRangeSearch.tsx
│   │   │   └── AdvancedSearch.tsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── DashboardStats.tsx
│   │   │   ├── DashboardOverview.tsx
│   │   │   ├── RecentActivity.tsx
│   │   │   ├── QuickActions.tsx
│   │   │   ├── NotificationCenter.tsx
│   │   │   ├── UpcomingExchanges.tsx
│   │   │   ├── PendingRequests.tsx
│   │   │   ├── FavoriteListings.tsx
│   │   │   └── DashboardNavigation.tsx
│   │   │
│   │   ├── maps/
│   │   │   ├── MapContainer.tsx
│   │   │   ├── MapMarker.tsx
│   │   │   ├── MapCluster.tsx
│   │   │   ├── MapControls.tsx
│   │   │   ├── MapSearch.tsx
│   │   │   ├── MapFilters.tsx
│   │   │   ├── LocationPicker.tsx
│   │   │   └── AddressAutocomplete.tsx
│   │   │
│   │   ├── forms/
│   │   │   ├── FormField.tsx
│   │   │   ├── FormGroup.tsx
│   │   │   ├── FormSection.tsx
│   │   │   ├── FormValidation.tsx
│   │   │   ├── FormStepper.tsx
│   │   │   ├── FormProgress.tsx
│   │   │   ├── FormActions.tsx
│   │   │   ├── ImageUploadField.tsx
│   │   │   ├── LocationField.tsx
│   │   │   ├── DateRangeField.tsx
│   │   │   └── TagsField.tsx
│   │   │
│   │   ├── notifications/
│   │   │   ├── NotificationBell.tsx
│   │   │   ├── NotificationList.tsx
│   │   │   ├── NotificationItem.tsx
│   │   │   ├── NotificationBadge.tsx
│   │   │   ├── NotificationSettings.tsx
│   │   │   ├── PushNotifications.tsx
│   │   │   └── EmailNotifications.tsx
│   │   │
│   │   ├── reviews/
│   │   │   ├── ReviewCard.tsx
│   │   │   ├── ReviewList.tsx
│   │   │   ├── ReviewForm.tsx
│   │   │   ├── ReviewRating.tsx
│   │   │   ├── ReviewStats.tsx
│   │   │   ├── ReviewFilters.tsx
│   │   │   └── ReviewSummary.tsx
│   │   │
│   │   ├── common/
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── ConfirmDialog.tsx
│   │   │   ├── ShareModal.tsx
│   │   │   ├── ImageViewer.tsx
│   │   │   ├── VideoPlayer.tsx
│   │   │   ├── FileViewer.tsx
│   │   │   ├── CopyToClipboard.tsx
│   │   │   ├── BackButton.tsx
│   │   │   ├── ScrollToTop.tsx
│   │   │   ├── LazyImage.tsx
│   │   │   ├── InfiniteScroll.tsx
│   │   │   └── VirtualList.tsx
│   │   │
│   │   └── providers/
│   │       ├── AuthProvider.tsx
│   │       ├── ThemeProvider.tsx
│   │       ├── ToastProvider.tsx
│   │       ├── ModalProvider.tsx
│   │       ├── QueryProvider.tsx
│   │       ├── SocketProvider.tsx
│   │       └── index.tsx
│   │
│   ├── hooks/
│   │   ├── auth/
│   │   │   ├── useAuth.ts
│   │   │   ├── useLogin.ts
│   │   │   ├── useRegister.ts
│   │   │   ├── useLogout.ts
│   │   │   ├── useProfile.ts
│   │   │   └── usePermissions.ts
│   │   │
│   │   ├── api/
│   │   │   ├── useListings.ts
│   │   │   ├── useListing.ts
│   │   │   ├── useExchanges.ts
│   │   │   ├── useExchange.ts
│   │   │   ├── useMessages.ts
│   │   │   ├── useUsers.ts
│   │   │   ├── useSearch.ts
│   │   │   ├── useNotifications.ts
│   │   │   ├── useReviews.ts
│   │   │   └── useUpload.ts
│   │   │
│   │   ├── ui/
│   │   │   ├── useModal.ts
│   │   │   ├── useToast.ts
│   │   │   ├── useDisclosure.ts
│   │   │   ├── useToggle.ts
│   │   │   ├── useClipboard.ts
│   │   │   ├── useLocalStorage.ts
│   │   │   ├── useSessionStorage.ts
│   │   │   ├── useDebounce.ts
│   │   │   ├── useThrottle.ts
│   │   │   ├── useClickOutside.ts
│   │   │   ├── useKeyPress.ts
│   │   │   ├── useWindowSize.ts
│   │   │   ├── useScrollPosition.ts
│   │   │   ├── useIntersectionObserver.ts
│   │   │   ├── usePagination.ts
│   │   │   ├── useInfiniteScroll.ts
│   │   │   └── useVirtualList.ts
│   │   │
│   │   ├── forms/
│   │   │   ├── useForm.ts
│   │   │   ├── useFormValidation.ts
│   │   │   ├── useFormStepper.ts
│   │   │   ├── useFileUpload.ts
│   │   │   ├── useImageUpload.ts
│   │   │   └── useFormPersist.ts
│   │   │
│   │   ├── maps/
│   │   │   ├── useMap.ts
│   │   │   ├── useGeolocation.ts
│   │   │   ├── useGeocode.ts
│   │   │   ├── useMapMarkers.ts
│   │   │   └── useLocationSearch.ts
│   │   │
│   │   └── utils/
│   │       ├── useAsync.ts
│   │       ├── useFetch.ts
│   │       ├── useWebSocket.ts
│   │       ├── useEventListener.ts
│   │       ├── useInterval.ts
│   │       ├── useTimeout.ts
│   │       ├── usePrevious.ts
│   │       ├── useUpdateEffect.ts
│   │       ├── useMountedState.ts
│   │       └── useIsomorphicLayoutEffect.ts
│   │
│   ├── contexts/
│   │   ├── AuthContext.tsx
│   │   ├── ThemeContext.tsx
│   │   ├── LanguageContext.tsx
│   │   ├── NotificationContext.tsx
│   │   ├── SocketContext.tsx
│   │   ├── SearchContext.tsx
│   │   ├── FilterContext.tsx
│   │   └── AppContext.tsx
│   │
│   ├── types/
│   │   ├── auth.ts
│   │   ├── user.ts
│   │   ├── listing.ts
│   │   ├── exchange.ts
│   │   ├── message.ts
│   │   ├── notification.ts
│   │   ├── review.ts
│   │   ├── search.ts
│   │   ├── api.ts
│   │   ├── common.ts
│   │   ├── forms.ts
│   │   ├── ui.ts
│   │   └── index.ts
│   │
│   ├── lib/
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   ├── endpoints.ts
│   │   │   ├── auth.ts
│   │   │   ├── listings.ts
│   │   │   ├── exchanges.ts
│   │   │   ├── messages.ts
│   │   │   ├── users.ts
│   │   │   ├── notifications.ts
│   │   │   ├── reviews.ts
│   │   │   ├── upload.ts
│   │   │   └── websocket.ts
│   │   │
│   │   ├── auth/
│   │   │   ├── config.ts
│   │   │   ├── providers.ts
│   │   │   ├── middleware.ts
│   │   │   ├── tokens.ts
│   │   │   ├── session.ts
│   │   │   └── permissions.ts
│   │   │
│   │   ├── database/
│   │   │   ├── connection.ts
│   │   │   ├── models.ts
│   │   │   ├── migrations.ts
│   │   │   ├── seeds.ts
│   │   │   └── queries.ts
│   │   │
│   │   ├── storage/
│   │   │   ├── config.ts
│   │   │   ├── upload.ts
│   │   │   ├── images.ts
│   │   │   ├── files.ts
│   │   │   └── cdn.ts
│   │   │
│   │   ├── email/
│   │   │   ├── config.ts
│   │   │   ├── templates.ts
│   │   │   ├── sender.ts
│   │   │   └── notifications.ts
│   │   │
│   │   ├── maps/
│   │   │   ├── config.ts
│   │   │   ├── geocoding.ts
│   │   │   ├── places.ts
│   │   │   └── directions.ts
│   │   │
│   │   ├── payments/
│   │   │   ├── config.ts
│   │   │   ├── stripe.ts
│   │   │   ├── paypal.ts
│   │   │   └── webhooks.ts
│   │   │
│   │   └── utils/
│   │       ├── constants.ts
│   │       ├── config.ts
│   │       ├── env.ts
│   │       ├── logger.ts
│   │       ├── errors.ts
│   │       ├── crypto.ts
│   │       ├── jwt.ts
│   │       ├── cookies.ts
│   │       └── helpers.ts
│   │
│   ├── utils/
│   │   ├── formatters/
│   │   │   ├── date.ts
│   │   │   ├── currency.ts
│   │   │   ├── number.ts
│   │   │   ├── text.ts
│   │   │   ├── address.ts
│   │   │   └── phone.ts
│   │   │
│   │   ├── validators/
│   │   │   ├── auth.ts
│   │   │   ├── listing.ts
│   │   │   ├── exchange.ts
│   │   │   ├── profile.ts
│   │   │   ├── message.ts
│   │   │   ├── common.ts
│   │   │   └── schemas.ts
│   │   │
│   │   ├── helpers/
│   │   │   ├── array.ts
│   │   │   ├── object.ts
│   │   │   ├── string.ts
│   │   │   ├── date.ts
│   │   │   ├── url.ts
│   │   │   ├── file.ts
│   │   │   ├── image.ts
│   │   │   ├── location.ts
│   │   │   ├── search.ts
│   │   │   └── analytics.ts
│   │   │
│   │   ├── api/
│   │   │   ├── request.ts
│   │   │   ├── response.ts
│   │   │   ├── error-handler.ts
│   │   │   ├── middleware.ts
│   │   │   └── rate-limiter.ts
│   │   │
│   │   └── security/
│   │       ├── sanitize.ts
│   │       ├── encrypt.ts
│   │       ├── hash.ts
│   │       ├── csrf.ts
│   │       └── xss.ts
│   │
│   ├── styles/
│   │   ├── globals.css
│   │   ├── components.css
│   │   ├── utilities.css
│   │   ├── animations.css
│   │   ├── themes/
│   │   │   ├── light.css
│   │   │   ├── dark.css
│   │   │   └── variables.css
│   │   ├── components/
│   │   │   ├── buttons.css
│   │   │   ├── forms.css
│   │   │   ├── cards.css
│   │   │   ├── modals.css
│   │   │   ├── navigation.css
│   │   │   ├── tables.css
│   │   │   └── typography.css
│   │   └── pages/
│   │       ├── home.css
│   │       ├── dashboard.css
│   │       ├── listings.css
│   │       ├── profile.css
│   │       └── auth.css
│   │
│   ├── store/
│   │   ├── index.ts
│   │   ├── slices/
│   │   │   ├── authSlice.ts
│   │   │   ├── userSlice.ts
│   │   │   ├── listingsSlice.ts
│   │   │   ├── exchangesSlice.ts
│   │   │   ├── messagesSlice.ts
│   │   │   ├── notificationsSlice.ts
│   │   │   ├── searchSlice.ts
│   │   │   ├── filtersSlice.ts
│   │   │   ├── uiSlice.ts
│   │   │   └── appSlice.ts
│   │   ├── middleware/
│   │   │   ├── logger.ts
│   │   │   ├── persist.ts
│   │   │   └── api.ts
│   │   └── selectors/
│   │       ├── auth.ts
│   │       ├── listings.ts
│   │       ├── exchanges.ts
│   │       ├── messages.ts
│   │       └── ui.ts
│   │
│   ├── constants/
│   │   ├── api.ts
│   │   ├── routes.ts
│   │   ├── config.ts
│   │   ├── enums.ts
│   │   ├── messages.ts
│   │   ├── validation.ts
│   │   ├── features.ts
│   │   └── index.ts
│   │
│   └── middleware.ts
│
├── tests/
│   ├── __mocks__/
│   │   ├── next-router.js
│   │   ├── next-auth.js
│   │   ├── api-client.js
│   │   └── file-upload.js
│   │
│   ├── setup/
│   │   ├── jest.config.js
│   │   ├── test-utils.tsx
│   │   ├── mock-providers.tsx
│   │   └── test-data.ts
│   │
│   ├── unit/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── Button.test.tsx
│   │   │   │   ├── Input.test.tsx
│   │   │   │   └── Modal.test.tsx
│   │   │   ├── listings/
│   │   │   │   ├── ListingCard.test.tsx
│   │   │   │   ├── ListingForm.test.tsx
│   │   │   │   └── ListingFilters.test.tsx
│   │   │   └── auth/
│   │   │       ├── LoginForm.test.tsx
│   │   │       └── RegisterForm.test.tsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAuth.test.ts
│   │   │   ├── useListings.test.ts
│   │   │   └── useForm.test.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── formatters.test.ts
│   │   │   ├── validators.test.ts
│   │   │   └── helpers.test.ts
│   │   │
│   │   └── api/
│   │       ├── auth.test.ts
│   │       ├── listings.test.ts
│   │       └── exchanges.test.ts
│   │
│   ├── integration/
│   │   ├── auth-flow.test.tsx
│   │   ├── listing-creation.test.tsx
│   │   ├── exchange-process.test.tsx
│   │   ├── messaging.test.tsx
│   │   └── search-functionality.test.tsx
│   │
│   ├── e2e/
│   │   ├── playwright.config.ts
│   │   ├── auth/
│   │   │   ├── login.spec.ts
│   │   │   ├── register.spec.ts
│   │   │   └── logout.spec.ts
│   │   ├── listings/
│   │   │   ├── create-listing.spec.ts
│   │   │   ├── view-listing.spec.ts
│   │   │   ├── edit-listing.spec.ts
│   │   │   └── delete-listing.spec.ts
│   │   ├── exchanges/
│   │   │   ├── request-exchange.spec.ts
│   │   │   ├── accept-exchange.spec.ts
│   │   │   └── complete-exchange.spec.ts
│   │   ├── search/
│   │   │   ├── basic-search.spec.ts
│   │   │   ├── advanced-search.spec.ts
│   │   │   └── filter-results.spec.ts
│   │   └── dashboard/
│   │       ├── overview.spec.ts
│   │       ├── my-listings.spec.ts
│   │       └── messages.spec.ts
│   │
│   └── performance/
│       ├── lighthouse.config.js
│       ├── load-testing.js
│       └── bundle-analysis.js
│
├── docs/
│   ├── README.md
│   ├── CONTRIBUTING.md
│   ├── DEPLOYMENT.md
│   ├── API.md
│   ├── ARCHITECTURE.md
│   ├── TESTING.md
│   ├── SECURITY.md
│   ├── PERFORMANCE.md
│   ├── TROUBLESHOOTING.md
│   ├── CHANGELOG.md
│   ├── api/
│   │   ├── authentication.md
│   │   ├── listings.md
│   │   ├── exchanges.md
│   │   ├── messages.md
│   │   └── users.md
│   ├── components/
│   │   ├── ui-components.md
│   │   ├── layout-components.md
│   │   └── business-components.md
│   ├── guides/
│   │   ├── getting-started.md
│   │   ├── development-setup.md
│   │   ├── coding-standards.md
│   │   ├── testing-guide.md
│   │   └── deployment-guide.md
│   └── assets/
│       ├── diagrams/
│       ├── screenshots/
│       └── mockups/
│
├── scripts/
│   ├── build.sh
│   ├── deploy.sh
│   ├── test.sh
│   ├── lint.sh
│   ├── format.sh
│   ├── db-migrate.sh
│   ├── db-seed.sh
│   ├── backup.sh
│   ├── restore.sh
│   └── cleanup.sh
│
├── config/
│   ├── database.js
│   ├── redis.js
│   ├── email.js
│   ├── storage.js
│   ├── maps.js
│   ├── payments.js
│   ├── monitoring.js
│   └── security.js
│
└── docker/
    ├── Dockerfile
    ├── docker-compose.yml
    ├── docker-compose.dev.yml
    ├── docker-compose.prod.yml
    ├── nginx.conf
    └── .dockerignore