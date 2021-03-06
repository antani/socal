require 'nokogiri'
require 'rexml/document'

class GDataController < ApplicationController

  before_filter :setup_google
  def fetch_feed
        scope = 'http://www.google.com/calendar/feeds/'
        uri = "http://www.google.com/calendar/feeds/default/private/full"
        if uri.nil?
            logger.debug 'No feed_url was specified for the app to fetch.<br/>'
        else
            #begin
            #  @feed = @client.get(uri)
              # If fetching fails
            #    rescue GData::Client::AuthorizationError
            #    @error = 'authorization error'
            #    logger.debug @error
            #end
       end
       #logger.debug @feed.to_yaml
       #Update the calendar feed with event
       logger.debug current_user
       if current_user
           @user = User.find(current_user.id)
           logger.debug @user.email
           @missing_calendar = @user.calendars.where(:sync => 'false')
       end
           @missing_calendar.each do |m|

           cal_entry = "<entry xmlns='http://www.w3.org/2005/Atom' xmlns:gd='http://schemas.google.com/g/2005'>"+"<category scheme='http://schemas.google.com/g/2005#kind' term='http://schemas.google.com/g/2005#event'></category>"+"<title type='text'>"+m.event+"</title><content type='text'>"+m.event+"</content>"+"<gd:transparency value='http://schemas.google.com/g/2005#event.opaque'></gd:transparency><gd:eventStatus value='http://schemas.google.com/g/2005#event.confirmed'></gd:eventStatus><gd:where valueString='"+m.event_location+"'></gd:where><gd:when startTime='"+(m.event_time).strftime("%Y-%m-%dT%H:%M:%S")+"' endTime='"+ (m.event_time+1.hour).strftime("%Y-%m-%dT%H:%M:%S")+"'><gd:reminder minutes='5'/></gd:when></entry>"


            response = @client.post(uri, cal_entry)
            logger.debug "----------------------------------------------------------------------------------------------------------"
            doc = response.to_xml.to_s
            logger.debug doc
            response_xml = Nokogiri::XML(doc)
            response_text = ""
            response_xml.xpath("//gcal:link[@rel='edit']", 'gcal'=>'http://www.w3.org/2005/Atom').each do |node|
            logger.debug response_text
                response_text= node
            end
            logger.debug response_text
            response_texts = response_text.to_s.split("\"")

            #doc = response
            #entry = doc.elements['entry']
            #edit_uri = entry.elements["link[@rel='edit']"].attributes['href']
            #logger.debug edit_uri
            #Once updated, we need to mark this sync complete.
            #m.toggle!(:sync)
            m.update_attributes(:sync => 'true',:gcal_id=>response_texts[1])
            m.save

        end
 


  #  render :controller => 'calendars', :action => 'fetch_feed'
  #redirect_to root_path
  end



  def index
      logger.debug "Inside Index action"
      fetch_feed
      redirect_to root_path
  end
  def show
  end
end

