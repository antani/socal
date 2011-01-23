class Addnotestocalendars < ActiveRecord::Migration
  def self.up
    add_column :calendars, :note, :text
  end

  def self.down
  end
end
