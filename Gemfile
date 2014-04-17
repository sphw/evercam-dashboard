source 'https://rubygems.org'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 4.1.0'

gem 'pg'

# Use SCSS for stylesheets
gem 'sass-rails', '~> 4.0.0'
gem 'yui-compressor'

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'

# Use CoffeeScript for .js.coffee assets and views
gem 'coffee-rails', '~> 4.0.0'

# Use jquery as the JavaScript library
gem 'jquery-rails'

# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'
gem 'jquery-turbolinks'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 1.2'

group :doc do
  # bundle exec rake doc:rails generates the API under doc/api.
  gem 'sdoc', require: false
end

gem 'bcrypt', '~> 3.1.2'
gem 'protected_attributes'
gem 'rack-rewrite'
gem 'sequel'
gem 'typhoeus'
gem 'puma'
gem 'data_uri'

gem 'rails_12factor', group: :production
gem 'intercom-rails', '~> 0.2.24'

group :evercam do
  gem 'evercam_misc', '~> 0.0'
  gem 'evercam_models', '~> 0.0'
end

group :development do
  gem 'quiet_assets'
  gem 'spring'
end

group :test do
  gem 'database_cleaner', git: 'git@github.com:bmabey/database_cleaner.git'
  gem 'factory_girl'
  gem 'rspec-rails', '~> 3.0.0.beta'
  gem 'vcr'
  gem 'webmock', '~> 1.17'
  gem 'capybara'
  gem 'simplecov'
  gem 'rack_session_access'
  gem 'selenium-webdriver'
  gem 'launchy'
end

ruby '2.1.1'