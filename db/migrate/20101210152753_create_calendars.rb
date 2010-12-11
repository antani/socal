class CreateCalendars < ActiveRecord::Migration
  def self.up
    create_table :calendars do |t|
      t.integer :id
      t.integer :user_id
      t.string :event
      t.string :where
      t.timestamps :when

      t.timestamps
    end
  end

  def self.down
    drop_table :calendars
  end
end

