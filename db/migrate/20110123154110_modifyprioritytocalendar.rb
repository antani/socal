class Modifyprioritytocalendar < ActiveRecord::Migration
  def self.up
    change_column :calendars, :priority, :integer, :default=>0
  end

  def self.down
  end
end
