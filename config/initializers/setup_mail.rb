ActionMailer::Base.smtp_settings = {
  :address              => "smtp.gmail.com",
  :port                 => 587,
  :domain               => "gmail.com",
  :user_name            => "socal.mailer",
  :password             => "Welcome@123",
  :authentication       => "plain",
  :enable_starttls_auto => true
}
ActionMailer::Base.default_url_options[:host] = "127.0.0.1:3000"
#Mail.register_interceptor(DevelopmentMailInterceptor) if Rails.env.development?

