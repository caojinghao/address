// components/select/select.js
let selecteds = []
Component({
  /**
   * 组件的属性列表
   */
 
  properties: {
    current:{
      type:Object
    }
  },
  ready(e){
    //转码数据名称
    setTimeout(()=>{
      let arrays=[]
      arrays.push({
        select: '请选择',
        key: -1
      })
      this.setData({
        publicObj: this.properties.current,
      })
      if (this.data.publicObj.multipleChoice==false){
        this.setData({
          "publicObj.selected": arrays
        })
      }
      console.log(this.data.publicObj)
      this.animation = wx.createAnimation()
    },1000)
  },
  /**
   * 组件的初始数据
   */
  data: {
    select:"请选择",
    publicObj:{},
    listItem:"",
    titleItem:"",
    index:0,
    indexs:0,
    page:"",
    currentItem:"",
    thatIndex:""
  },
  /**
   * 组件的方法列表
   */
  methods: {
    select(e){
      let _public = this.data.publicObj
      let that = e.currentTarget.dataset
      let pages= _public.page
      let indexs = that.index
      let pageLists = _public.pageList[indexs].a||_public.pageList
      if (_public.multipleChoice){
        var item = _public.pageList[indexs];
        item.isSelected = !item.isSelected;
        let list = []
        let b = false
        for (let i in _public.selected) {
          if (_public.selected[i].key != indexs) {
            list.push(_public.selected[i])
          } else {
            b = true
          }
        }
        if (b) {
          _public.selected = _public.selected.filter(function (item) {
            return item.key != indexs
          })
        } else {
          _public.selected.push({
             select: that.item, key: that.index   
          })
        }
        this.setData({
          listItem: that.item,
        })
        this.triggerEvent('parentEvent', _public.selected)
        this.setData({
          'publicObj.pageList': _public.pageList,
        })
      }else{
        if (_public.quantity <= 1) {
          if (this.data.index == 0) {
            pages = 0
            _public.selected = []
            this.data.index = this.data.index + 1
          }
        } else if (_public.quantity == 2){
          if (this.data.index ==0) {
            pages = 0
            _public.selected = []
            this.data.index = this.data.index + 1
          } else if (this.data.index == 1){
            pages = 1
            _public.selected.splice(this.data.index,1)
            this.data.index = this.data.index + 1
          }
        }
      _public.selected[pages]={select:that.item,key:that.index}  
        console.log(_public.selected[pages].key)  
        this.setData({
          page: pages
        })
        if (pages < _public.quantity) {
          ++pages
        } else {
          this.triggerEvent('parentEvent', _public.selected)
          setTimeout(() => {
          this.close()
          }, 200)

        }
        let arrays = []
        for (let e of _public.selected) {
          arrays.push(e)
        }
        console.log(arrays)
        console.log(_public.selected.length)
        console.log(_public.quantity)
        if (_public.selected.length <= _public.quantity) {
          arrays.push({
            select: '请选择',
            key: -1
          })
        }
        this.setData({
          'publicObj.selected': arrays,
          
        })
        
        setTimeout(()=>{
          this.setData({
            'publicObj.pageList': pageLists,
            "publicObj.page": pages,
            listItem: that.item,
            thatIndex: that.index
        })
        }, 200)

     
      }
      console.log(_public.selected)
    },
    choice(e){
      let _public = this.data.publicObj,
        that = e.currentTarget.dataset,
        list = _public.data,
        array= _public.selected
    
      for (let i = 0; i < that.index;i++){
        list = list[array[i].key].a
      }
      this.setData({
        'publicObj.pageList': list,
        'publicObj.page': that.index,
        titleItem: that.item,
        index: that.index,
      })
    },
   
    close(){
      this.setData({
          "current.show": false
      })
    },
  }
})
