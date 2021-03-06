# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20110309152401) do

  create_table "authentications", :force => true do |t|
    t.integer   "user_id"
    t.string    "provider"
    t.string    "uid"
    t.timestamp "created_at"
    t.timestamp "updated_at"
    t.string    "token"
    t.string    "secret"
  end

  create_table "calendar_categories", :force => true do |t|
    t.timestamp "created_at"
    t.timestamp "updated_at"
    t.integer   "calendar_id"
    t.integer   "category_id"
  end

  create_table "calendars", :force => true do |t|
    t.integer  "user_id"
    t.string   "event"
    t.string   "event_location"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "event_time"
    t.date     "whendate"
    t.boolean  "important",          :default => false
    t.float    "latitude"
    t.float    "longitude"
    t.boolean  "done",               :default => false
    t.string   "sync",               :default => "false"
    t.boolean  "twitter_shared",     :default => false
    t.boolean  "facebook_shared",    :default => false
    t.boolean  "foursquare_shared",  :default => false
    t.integer  "remind_before",      :default => 10
    t.string   "remind_before_what", :default => "Minutes"
    t.text     "reminder_time"
    t.string   "category_str"
    t.text     "note"
    t.integer  "priority",           :default => 0
    t.string   "gcal_id"
    t.string   "invite"
  end

  create_table "categories", :force => true do |t|
    t.string    "cat_name"
    t.timestamp "created_at"
    t.timestamp "updated_at"
  end

  create_table "users", :force => true do |t|
    t.string    "email",                               :default => "",        :null => false
    t.string    "encrypted_password",   :limit => 128, :default => "",        :null => false
    t.string    "password_salt",                       :default => "",        :null => false
    t.string    "reset_password_token"
    t.string    "remember_token"
    t.timestamp "remember_created_at"
    t.integer   "sign_in_count",                       :default => 0
    t.timestamp "current_sign_in_at"
    t.timestamp "last_sign_in_at"
    t.string    "current_sign_in_ip"
    t.string    "last_sign_in_ip"
    t.timestamp "created_at"
    t.timestamp "updated_at"
    t.string    "timezone"
    t.string    "confirmation_token"
    t.timestamp "confirmed_at"
    t.timestamp "confirmation_sent_at"
    t.integer   "reminder_duration",                   :default => 10
    t.boolean   "share_twitter",                       :default => false
    t.boolean   "share_facebook",                      :default => false
    t.boolean   "share_foursquare",                    :default => false
    t.text      "remind_before_what",                  :default => "Minutes"
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

end
