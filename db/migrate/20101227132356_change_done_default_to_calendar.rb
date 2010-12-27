class ChangeDoneDefaultToCalendar < ActiveRecord::Migration
  def self.up
     change_column :calendars, :done, :boolean, :default => false

  end

  def self.down
  end
end

