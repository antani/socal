class Addreminderdurationtouser < ActiveRecord::Migration
  def self.up
    add_column :users, :reminder_duration, :integer
  end

  def self.down
    remove_column :users, :reminder_duration
  end
end

