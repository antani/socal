class AddReminderToCalendar < ActiveRecord::Migration
  def self.up
    change_column :calendars, :remind_before, :integer, :default => 10
    change_column :calendars, :remind_before_what, :varchar, :default => "Minutes"
    change_column :users, :reminder_duration, :integer, :default => 10
    add_column :users, :remind_before_what, :varchar, :default => "Minutes"
  end

  def self.down
  end
end

