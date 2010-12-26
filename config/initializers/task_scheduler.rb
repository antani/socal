require 'rufus/scheduler'
require 'twitter'

scheduler = Rufus::Scheduler.start_new

scheduler.every("1m") do

   noise
end

 def noise
    Rails.logger.debug "Starting to create noise---------------------------------------------------------------"
    #Find all calendars that have 'when' = now.
    @mail_calendar = Calendar.where(:when => (Time.now+5.minutes)..(Time.now+6.minutes))
    @mail_calendar.each do |c|
      UserMailer.registration_confirmation(c.user,c).deliver
      twitter_noise(c.user,c)
    end
    Rails.logger.debug "Noised---------------------------------------------------------------------------------"
  end


  def twitter_noise(user,calendar)
    Rails.logger.debug "Starting to create twitter noise-------------------------------------------------------"
    auth = user.authentications.find(:first, :conditions => { :provider => 'twitter' })
    Rails.logger.debug auth
    if auth
        Rails.logger.debug auth.provider
        Rails.logger.debug auth.uid
        Rails.logger.debug auth.token
        Rails.logger.debug auth.secret

        Twitter.configure do |config|
          config.consumer_key = 'vm1CDPRNqXHXseMnUKHxDA'
          config.consumer_secret = 'O08Pt86u7n8mNhWdT78ODCAxm8UJjEJEyOkF6rPho'
          config.oauth_token = auth.token
          config.oauth_token_secret = auth.secret
        end
    #    @client ||= Twitter::Client.new
        Twitter.update("From Socal -" + calendar.event)
     end
  end

