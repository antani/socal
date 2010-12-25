require 'rufus/scheduler'
scheduler = Rufus::Scheduler.start_new

scheduler.every("1m") do

   noise
end

 def noise
    Rails.logger.debug "Starting to create noise"
    #Find all calendars that have 'when' = now.
    @mail_calendar = Calendar.where(:when => (Time.now+5.minutes)..(Time.now+6.minutes))
    @mail_calendar.each do |c|
      UserMailer.registration_confirmation(c.user,c).deliver
    end
    Rails.logger.debug "Noised"
  end

