class UserMailer < ActionMailer::Base
  default :from => "socal.mailer@gmail.com"

  def registration_confirmation(user,calendar)
    @user = user
    @cal = calendar
    mail(:to => "<#{user.email}>", :subject => "Registered")
  end

end

