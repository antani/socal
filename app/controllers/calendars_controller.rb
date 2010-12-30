class CalendarsController < ApplicationController
#  include Twitter::AuthenticationHelpers
#  rescue_from Twitter::Unauthorized, :with => :force_sign_in


  #-----------------------------Nasty Bug !
  #Time.zone = "UTC"
  Chronic.time_class = Time.zone
  #Chronic.time_class = current_user.timezone

  # GET /calendars
  # GET /calendars.xml
  def index
    @calendars = Calendar.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @calendars }
    end
  end

  # GET /calendars/1
  # GET /calendars/1.xml
  def show
    @calendar = Calendar.find(params[:id], :order => '"calendars.when"')

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
    whereStr =  params['calendar']['where']
    whenStr  =  params['calendar']['when']
    logger.debug "whenStr : "
    logger.debug whenStr
    #Get geo location
    if whereStr.empty?
      lat =nil
      lon =nil
    else
      co_ords=Geocoder.fetch_coordinates(whereStr)
      logger.debug co_ords[0]
      logger.debug co_ords[1]
      lat = co_ords[0]
      lon = co_ords[1]
    end
    #guess the timining of the event
    if !whenStr.empty? && whenStr != nil
      begin
          guessed_when = Chronic.parse(whenStr)
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
      importantEvent = eventStr.include? 'important'

      @calendar  = current_user.calendars.build(:event=>eventStr, :where=>whereStr, :when => guessed_when, :whendate => guessed_when.to_date, :important => importantEvent, :latitude => lat, :longitude => lon)
      if @calendar
        if @calendar.save
          #post_to_twitter(@calendar)
          #flash[:success] = "Calendar created"
          #send_mail

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
      when_date = @calendar.when.to_date
      @calendar.update_attributes(:whendate => when_date)
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

end

