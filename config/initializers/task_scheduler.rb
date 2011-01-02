require 'rufus/scheduler'
require 'twitter'
require 'gdata'

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
      facebook_noise(c.user,c)
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
          #config.consumer_key = 'vm1CDPRNqXHXseMnUKHxDA'
          #config.consumer_secret = 'O08Pt86u7n8mNhWdT78ODCAxm8UJjEJEyOkF6rPho'
          config.consumer_key = 'LkNRuATCSidM7rF63NnUYw'
          config.consumer_secret = '96cdM22QKD5ZeGuI2jv7wYXm7SuT1lBdj2hxWD1kwgA'
          config.oauth_token = auth.token
          config.oauth_token_secret = auth.secret
        end
    #    @client ||= Twitter::Client.new
        Twitter.update("From Socal -" + calendar.event)
    end
  end

  def facebook_noise(user,calendar)
    Rails.logger.debug "Starting to create facebook_noise noise-------------------------------------------------------"
    auth = user.authentications.find(:first, :conditions => { :provider => 'facebook' })
    Rails.logger.debug auth
    if auth
        Rails.logger.debug "Auth-token for fb :"
        Rails.logger.debug auth.token
        Rails.logger.debug "--------------------"
        graph = Koala::Facebook::GraphAPI.new(auth.token)
        profile = graph.get_object("me")

        #friends = graph.get_connections("me", "friends")
        #graph.put_object("me", "feed", :message => "From Socal")
        graph.put_wall_post("is.." + calendar.event)
    end
  end

