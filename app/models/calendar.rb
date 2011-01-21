class Calendar < ActiveRecord::Base
  belongs_to :user
  has_many :categories
  attr_accessible :event, :event_location, :event_time, :whendate, :important, :latitude, :longitude, :done, :remind_before, :remind_before_what, :reminder_time
  #Validation
  validates :event, :presence => true, :length => {:maximum => 140}


   # Default sort order
  #default_scope :order => '"calendars.when"'

   def noise
     logger.debug "---------Trying to create noise-----------------------------"
    #Find all calendars that have 'when' = now.
    @mail_calendar = Calendar.where(:event_time => (Time.now+5.minutes)..(Time.now+6.minutes))
    @mail_calendar.each do |c|
      UserMailer.registration_confirmation(c.user,c).deliver
    end
  end

end

