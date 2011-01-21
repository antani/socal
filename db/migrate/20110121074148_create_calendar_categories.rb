class CreateCalendarCategories < ActiveRecord::Migration
  def self.up
    create_table :calendar_categories do |t|

      t.timestamps
    end
  end

  def self.down
    drop_table :calendar_categories
  end
end
