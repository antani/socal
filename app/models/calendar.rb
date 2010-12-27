class Calendar < ActiveRecord::Base
  belongs_to :user
  attr_accessible :event, :where, :when, :whendate, :important, :latitude, :longitude, :done
  #Validation
  validates :event, :presence => true, :length => {:maximum => 140}


   # Default sort order
  #default_scope :order => '"calendars.when"'

   def noise
     logger.debug "---------Trying to create noise-----------------------------"
    #Find all calendars that have 'when' = now.
    @mail_calendar = Calendar.where(:when => (Time.now+5.minutes)..(Time.now+6.minutes))
    @mail_calendar.each do |c|
      UserMailer.registration_confirmation(c.user,c).deliver
    end
  end

end

