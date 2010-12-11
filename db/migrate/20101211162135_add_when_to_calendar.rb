class AddWhenToCalendar < ActiveRecord::Migration
  def self.up
    add_column :calendars, :when, :timestamp
  end

  def self.down
    remove_column :calendars, :when
  end
end
