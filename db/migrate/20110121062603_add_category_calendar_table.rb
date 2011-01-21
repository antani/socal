class AddCategoryCalendarTable < ActiveRecord::Migration
  def self.up
      create_table :calendar_category do |t|
        t.integer :calendar_id
        t.integer :category_id
      end  
   
  end

  def self.down
  end
end
