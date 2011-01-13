class ChangeCalendarColumnNames < ActiveRecord::Migration
  def self.up
    rename_column :calendars, :when, :event_time
    rename_column :calendars, :where, :event_location    
  end

  def self.down
  end
end
