class CalendarsController < ApplicationController
  before_filter :set_chronic_time_zone
#  include Twitter::AuthenticationHelpers
#  rescue_from Twitter::Unauthorized, :with => :force_sign_in
#  caches_page :index, :show
  PRIVATE_KEY = '/public/socal.pem'
  DOCLIST_SCOPE = 'http://docs.google.com/feeds/'
  CONTACTS_SCOPE = 'http://www.google.com/m8/feeds/'
  SPREADSHEETS_SCOPE = 'http://spreadsheets.google.com/feeds/'
  DOCLIST_DOWNLOD_SCOPE = 'http://docs.googleusercontent.com/'
  DOCLIST_FEED = DOCLIST_SCOPE + 'default/private/full'

  #-----------------------------Nasty Bug !
  #Time.zone = "UTC"
  #Chronic.time_class = Time.zone


  # GET /calendars
  # GET /calendars.xml
  def index
    if params[:token] and session[:token].nil?
      @client.authsub_token = params[:token]
      session[:token] = @client.auth_handler.upgrade()
    end
    @client.authsub_token = session[:token] if session[:token]
    fetch_feed

    @calendars = Calendar.all
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @calendars }
    end
  end

  # GET /calendars/1
  # GET /calendars/1.xml
  def show
    logger.debug "........................Calendars.show"
    @calendar = Calendar.find(params[:id], :order => '"calendars.event_time"')

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @calendar }
    end
  end

  # GET /calendars/new
  # GET /calendars/new.xml
  def new
    @calendar = Calendar.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @calendar }
    end
  end

  # GET /calendars/1/edit
  def edit
    @calendar = Calendar.find(params[:id])
  end

  def create
    eventStr =  params['calendar']['event']
    whereStr =  params['calendar']['event_location']
    whenStr  =  params['calendar']['event_time']
    logger.debug "whenStr : "
    logger.debug whenStr
    logger.debug "User timezone : ---------------" || Chronic.time_class = Time.zone
    
    #Get geo location
    if whereStr.empty?
      lat =nil
      lon =nil
    else
      co_ords=Geocoder.fetch_coordinates(whereStr)
      if co_ords
        logger.debug co_ords[0]
        logger.debug co_ords[1]
        lat = co_ords[0]
        lon = co_ords[1]
      else
        lat = 0.0
        lon = 0.0
      end
    end
    #guess the timining of the event
    #Chronic.time_class = @current_user.timezone
    
    if !whenStr.empty? && whenStr != nil
      begin
          guessed_when = Chronic.parse(whenStr,:now => Time.now)
          logger.debug "guessed_when 1: "
          logger.debug guessed_when
          if guessed_when.nil?
             guessed_when = Time.now
          logger.debug "guessed_when 2: "
          logger.debug guessed_when
          end
      rescue Exception => exc
          guessed_when = Time.now
          logger.debug "guessed_when 3: "
          logger.debug guessed_when
      end
    else
      guessed_when = Time.zone.now
          logger.debug "guessed_when 4: "
          logger.debug guessed_when
    end

    logger.debug 'Inside create....................................................'
    logger.debug guessed_when
    #logger.debug location
    logger.debug eventStr
    logger.debug '.................................................................'

    if eventStr
      #Automatically flag an event important
      importantEvent = eventStr.downcase.include? 'important'
      reminder_duration = current_user.reminder_duration
      reminder_duration_what = current_user.remind_before_what
      reminder_time_s = guessed_when - reminder_duration.to_i.send(reminder_duration_what.downcase.to_sym)
     # guessed_cateogy = get_category(eventStr)
      guessed_category=get_category(eventStr)
      
      @calendar  = current_user.calendars.build(:event=>eventStr, :event_location=>whereStr, :event_time => guessed_when, :whendate => guessed_when.to_date, :important => importantEvent, :latitude => lat, :longitude => lon, :remind_before => reminder_duration, :remind_before_what => reminder_duration_what, :reminder_time => reminder_time_s)
      if @calendar
        if @calendar.save
          #post_to_twitter(@calendar)
          #flash[:success] = "Calendar created"
          #send_mail
          #Get new calendar ID and saved all categories
          if guessed_category
            id = @calendar.id
            concat_cat = ""
            guessed_category.each do |g|
              @single_cat = Category.where(:id => g.id).first
              concat_cat = concat_cat + " " +(@single_cat.cat_name)
              logger.debug ".........concat_cat................"
              logger.debug concat_cat
              
              @cc = CalendarCategory.new(:calendar_id=>id, :category_id=> g.id)
              @cc.save
              
              @calendar.update_attributes(:category_str=>concat_cat) 
              
            end
          end
          redirect_to root_path
      else
        @feed_items = []
          #render 'pages/home'
          redirect_to root_path
        end
      end
    end
  end

 def destroy
    logger.debug 'Inside delete method'
    @calendar = Calendar.find(params[:id])
    @calendar.destroy

    respond_to do |format|
      format.html { redirect_to root_path }
      format.js
    end
    #        render 'pages/home'


    #redirect_back_or root_path
  end

  # PUT /calendars/1
  # PUT /calendars/1.xml
  def update
    @calendar = Calendar.find(params[:id])

   respond_to do |format|
     if @calendar.update_attributes(params[:calendar])
      when_s = params[:calendar][:event_time]
      when_date = when_s.to_date
      remind_what = params[:reminder_before_what]
      remind_before = params[:calendar][:remind_before]

      
      reminder_time_s = when_s.to_datetime - remind_before.to_i.send(remind_what.downcase.to_sym)
      @calendar.update_attributes(:whendate => when_date, :remind_before_what => remind_what, :reminder_time => reminder_time_s )
      #format.html { redirect_to(@calendar, :notice => 'Calendar was successfully updated.') }
      format.html {
        #flash[:success] = "Calendar updated"
        redirect_to root_path
      }
      format.js
      format.xml  { head :ok }
     else
      format.html { render :action => "edit" }
      format.js
      format.xml  { render :xml => @calendar.errors, :status => :unprocessable_entity }
     end
   end
 end

  def toggle_done
    @calendar = Calendar.find(params[:id])
    @calendar.toggle!(:done)

    respond_to do |format|

      format.html {
      flash[:success] = "Calendar updated"
      redirect_to root_path
      }
      format.js
    end
  end





 def send_mail
   UserMailer.registration_confirmation(@current_user,@calendar).deliver
 end
 
 def set_chronic_time_zone
  Chronic.time_class = Time.zone
 end

  def get_category(eventStr)
    eventArray = eventStr.downcase.split(/ /) #create a space separated array of words
    cats = Category.where("LOWER(cat_name) in (?)", eventArray)
    
    cats.each do |c|
      logger.debug c.cat_name
    end
    cats    # return the guessed categories
  end

end

