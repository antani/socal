class RenameCalendarCategory < ActiveRecord::Migration
  def self.up
    drop_table :calendar_category
  end

  def self.down
  end
end
