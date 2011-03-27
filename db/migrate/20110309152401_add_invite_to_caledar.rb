class AddInviteToCaledar < ActiveRecord::Migration
  def self.up
    add_column :calendars, :invite, :string
  end

  def self.down
  end
end
