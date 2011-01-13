class Addremindertimetocalendars < ActiveRecord::Migration
  def self.up
    add_column :calendars, :reminder_time, :date_time
  end

  def self.down
  end
end
