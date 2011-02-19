ActionMailer::Base.smtp_settings = {
  :address              => "smtp.gmail.com",
  :port                 => 587,
  :domain               => "socl.in",
  :user_name            => "socl.in@socl.in",
  :password             => "upni5had",
  :authentication       => :plain,
  :enable_starttls_auto => true
}
ActionMailer::Base.default_url_options[:host] = "www.socl.in"
ActionMailer::Base.delivery_method = :smtp
ActionMailer::Base.perform_deliveries = true
ActionMailer::Base.raise_delivery_errors = true
ActionMailer::Base.default_charset = "utf-8"

#Mail.register_interceptor(DevelopmentMailInterceptor) if Rails.env.development?

