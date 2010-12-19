class CalendarsController < ApplicationController
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
    # Due to the bug in Chronic- words 'on' or 'at' dont work well
    # we need to remove those words from events before we parse in chronic
    trimmedEventStr = eventStr.downcase
    trimmedEventStr = trimmedEventStr.gsub('on','')
    trimmedEventStr = trimmedEventStr.gsub('at','')
    #eventStr = eventStr.downcase
    #eventStr = eventStr.gsub('on', ' ' )
    #eventStr = eventStr.gsub('at', ' ' )

    if eventStr != nil
      guessed_when = Chronic.parse(trimmedEventStr)
    else
      guessed_when = Time.now
    end

    logger.debug 'Inside create....................................................'
    logger.debug trimmedEventStr
    logger.debug guessed_when
    logger.debug '.................................................................'




    logger.debug eventStr
    logger.debug '..............'
    if eventStr
      @calendar  = current_user.calendars.build(:event=>eventStr, :where=>'New York', :when => guessed_when, :whendate => guessed_when.to_date)
      if @calendar
        if @calendar.save
          flash[:success] = "Calendar created!"
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
        flash[:success] = "Calendar created!"
        redirect_to root_path
      }
      format.js
      format.xml  { head :ok }
     else
      format.html { render :action => "edit" }
      format.xml  { render :xml => @calendar.errors, :status => :unprocessable_entity }
     end
   end
 end


end

