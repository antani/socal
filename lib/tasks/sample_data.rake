require 'populator'
require 'faker'

namespace :db do
  desc "Fill database with sample data"
  task :populate => :environment do
    #User.all(:limit => 6).each do |user|
    #  150.times do
    #    user.calendars.create!(
    #    :event=>Populator.sentences(2..20),
#        :event => Faker::Lorem.sentence(5),
    #    :where => Faker::Lorem.sentence)
    #  end

    Calendar.populate 1..10 do |cal|
      cal.user_id =1
      cal.event = Populator.words(2..5)
      cal.where = Populator.words(1..6).titleize
      #cal.when = Time.now..Time.now + 3.days
      cal.when = Time.now-7.days..Time.now
    end



  end
end

