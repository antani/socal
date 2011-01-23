class Addprioritytocalendar < ActiveRecord::Migration
  def self.up
    add_column :calendars, :priority, :integer
  end

  def self.down
  end
end
